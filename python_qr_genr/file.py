import qrcode
import random
import string
from pymongo import MongoClient

def generate_qr_code(url, random_hash):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save(f"qr_code_{random_hash}.png")

def generate_random_hash(length=8):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

if __name__ == "__main__":
    num_qr_codes = 2

    # Connect to MongoDB
    client = MongoClient("mongodb://localhost:27017/")
    db = client["qr_app"]
    collection = db["user_data"]

    # Ensure unique index on "qrid"
    collection.create_index("qrid", unique=True)

    # Generate and save QR codes in a loop
    for _ in range(num_qr_codes):
        random_hash = generate_random_hash()
        url = f"http://localhost:8080/data?id={random_hash}"
        generate_qr_code(url, random_hash)

        # Insert the random hash into the MongoDB collection
        try:
            collection.insert_one({
                "qrid": random_hash,
                "isactivated": False
            })
            print(f"Inserted QR code with qrid: {random_hash}")
        except Exception as e:
            print(f"Error inserting QR code with qrid {random_hash}: {e}")

    print("QR code generation and insertion completed.")
    client.close()
