import sys
import os
import numpy as np
import cv2
from PIL import Image
import pytesseract
import re
from urllib.request import urlopen
import pymongo
from flask import Flask,request,jsonify
# Set Tesseract path
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
app = Flask(__name__)
# Detecting number plate
def number_plate_detection(img_url):
    try:
        resp = urlopen(img_url)
        img_bytes = resp.read()
        img = cv2.imdecode(np.frombuffer(img_bytes, np.uint8), cv2.IMREAD_COLOR)

        if img is None or img.size == 0:
            return None

        def clean2_plate(plate):
            gray_img = cv2.cvtColor(plate, cv2.COLOR_BGR2GRAY)
            _, thresh = cv2.threshold(gray_img, 110, 255, cv2.THRESH_BINARY)
            num_contours,hierarchy = cv2.findContours(thresh.copy(),cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)

            if num_contours:
                contour_area = [cv2.contourArea(c) for c in num_contours]
                max_cntr_index = np.argmax(contour_area)

                max_cnt = num_contours[max_cntr_index]
                max_cntArea = contour_area[max_cntr_index]
                x,y,w,h = cv2.boundingRect(max_cnt)

                if not ratioCheck(max_cntArea,w,h):
                    return plate,None

                final_img = thresh[y:y+h, x:x+w]
                return final_img,[x,y,w,h]
            else:
                return plate,None

        def ratioCheck(area, width, height):
            ratio = float(width) / float(height)
            if ratio < 1:
                ratio = 1 / ratio
            if (area < 1063.62 or area > 73862.5) or (ratio < 3 or ratio > 6):
                return False
            return True

        def isMaxWhite(plate):
            avg = np.mean(plate)
            if(avg>=115):
                return True
            else:
                return False

        def ratio_and_rotation(rect):
            (x, y), (width, height), rect_angle = rect

            if(width>height):
                angle = -rect_angle
            else:
                angle = 90 + rect_angle

            if angle>15:
                return False

            if height == 0 or width == 0:
                return False

            area = height*width
            if not ratioCheck(area,width,height):
                return False
            else:
                return True

        img2 = cv2.GaussianBlur(img, (5,5), 0)
        img2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
        img2 = cv2.Sobel(img2, cv2.CV_8U, 1, 0, ksize=3)
        _,img2 = cv2.threshold(img2, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        element = cv2.getStructuringElement(shape=cv2.MORPH_RECT, ksize=(17, 3))
        morph_img_threshold = img2.copy()
        cv2.morphologyEx(src=img2, op=cv2.MORPH_CLOSE, kernel=element, dst=morph_img_threshold)
        num_contours, hierarchy= cv2.findContours(morph_img_threshold,mode=cv2.RETR_EXTERNAL,method=cv2.CHAIN_APPROX_NONE)
        cv2.drawContours(img2, num_contours, -1, (0,255,0), 1)

        for i,cnt in enumerate(num_contours):
            min_rect = cv2.minAreaRect(cnt)
            if ratio_and_rotation(min_rect):
                x,y,w,h = cv2.boundingRect(cnt)
                plate_img = img[y:y+h,x:x+w]
                if(isMaxWhite(plate_img)):
                    clean_plate, rect = clean2_plate(plate_img)
                    if rect:
                        fg=0
                        x1,y1,w1,h1 = rect
                        x,y,w,h = x+x1,y+y1,w1,h1
                        plate_im = Image.fromarray(clean_plate)
                        text = pytesseract.image_to_string(plate_im, lang='eng')
                        return text
    except Exception as e:
        print("Error:", e)
        return None

print("Welcome to the Number Plate Detection System.\n")

@app.route('/get_text', methods=['POST'])
def get_number():
    data = request.get_json()
    url = data.get('url')
    print(url)
    number_plate_with_space = (number_plate_detection(url))
    number_plate=number_plate_with_space.replace(" ", "").replace("\n","")
    print(number_plate)
    return jsonify(number=number_plate)
if __name__ == '__main__':
    app.run(debug=True)