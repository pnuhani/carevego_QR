import qrcode
import random
import string
import jaydebeapi
import os
import psycopg2

def generate_qr_code(url,random_hash):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save("qr_code_"+random_hash+".png")

def generate_random_hash(length=8):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

if __name__ == "__main__":
    #check_connection()
    num_qr_codes = 10

       # Connect to the PostgreSQL database
    conn = psycopg2.connect(
            dbname='qrNuhani',
            user='prashant',
            password='password',
            host='localhost',
            port='5432'
    )


    # Create a cursor
    cursor = conn.cursor()
    # Create the user_data table if it doesn't exist
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS user_data (
            id SERIAL PRIMARY KEY,
            qrid VARCHAR(12) NOT NULL,
            isactivated BOOLEAN NOT NULL DEFAULT FALSE
        )
    """)
    # Commit the transaction
    conn.commit()
# Generate and save QR codes in a loop
    for _ in range(num_qr_codes):
        random_hash = generate_random_hash()
        url = f"http://localhost:8080/data?id={random_hash}"
        generate_qr_code(url, random_hash)
          # Insert the random hash into the database
        cursor.execute("""
            INSERT INTO USER_DATA (qrid, isactivated)
            VALUES (%s, %s)
            ON CONFLICT DO NOTHING;
            ALTER TABLE USER_DATA
            ADD COLUMN IF NOT EXISTS qrid VARCHAR(12);
            ALTER TABLE USER_DATA
            ADD COLUMN IF NOT EXISTS isactivated BOOLEAN;
        """, (random_hash, False))

            # Commit the transaction
        conn.commit()

            # Close cursor and connection
    cursor.close()
    conn.close()