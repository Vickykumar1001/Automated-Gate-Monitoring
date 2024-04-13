import pymongo

# Connect to MongoDB
client = pymongo.MongoClient("mongodb+srv://vickykumar1001:Vicky%40BT21EC038@cluster0.xwttq4y.mongodb.net")
db = client["VehicleData"]
collection = db["sarthis"]

# Function to check if license number is verified
def check_license(license_number):
    query = {"licenceNumber": license_number}
    result = collection.find_one(query)
    return result is not None

# Main function
def main():
    while True:
        # Prompt user for license number
        license_number = input("Please enter your license number (type 'quit' to exit): ").strip()

        if license_number.lower() == "quit":
            print("Exiting...")
            break

        # Check if license number is verified
        if check_license(license_number):
            print("Your license number is verified. You are a verified driver.")
        else:
            print("Your license number is not verified. You are not a verified driver.")

if __name__ == "__main__":
    main()
