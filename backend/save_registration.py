from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import psycopg2

class RegistrationServer(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/register':  # Handle registration requests
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))

            name = data.get('name')
            email = data.get('email')
            password = data.get('password')

            # Save to database
            response = save_user_to_db(name, email, password)

            
            self.send_response(200 if response['status'] == 'success' else 400)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode('utf-8'))
            
        elif self.path == '/login':  # Handle login requests
            self.handle_login()
            
        
        if self.path == '/update_credentials': # Handle update credentials requests
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))

            user_id = data.get('id')
            new_email = data.get('email')
            new_password = data.get('password')

            response = update_credentials_in_db(user_id, new_email, new_password)

            self.send_response(200 if response['status'] == 'success' else 400)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode('utf-8'))

def handle_login(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))

            email = data.get('email')
            password = data.get('password')

            
            response = verify_user(email, password)

            self.send_response(200 if response['status'] == 'success' else 400)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode('utf-8'))

        except Exception as e:
            print(f"Error processing login request: {e}")
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            error_response = {"status": "error", "message": "Internal server error"}
            self.wfile.write(json.dumps(error_response).encode('utf-8'))
def save_user_to_db(name, email, password):
    try:
        # Connect to PostgreSQL
        connection = psycopg2.connect(
            dbname="registration",
            user="postgres",
            password="1234", 
            host="localhost",
            port="5432" 
        )
        cursor = connection.cursor()

        
        query = "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)"
        cursor.execute(query, (name, email, password))
        connection.commit()
        return {"status": "success", "message": "User data saved successfully!"}

    except psycopg2.Error as e:
        return {"status": "error", "message": str(e)}

    finally:
        if connection:
            cursor.close()
            connection.close()

def verify_user(email, password):
    try:
        
        connection = psycopg2.connect(
            dbname="registration",
            user="postgres",
            password="1234", 
            host="localhost",
            port="5432" 
        )
        cursor = connection.cursor()

        # Query to check user credentials
        query = "SELECT * FROM users WHERE email = %s AND password = %s"
        cursor.execute(query, (email, password))
        user = cursor.fetchone()

        if user:
            user_data = {"id": user[0], "name": user[1], "email": user[2]}
            return {"status": "success", "message": "Login successful!", "user": user_data}
        else:
            return {"status": "error", "message": "Invalid email or password."}

    except psycopg2.Error as e:
        return {"status": "error", "message": str(e)}

    finally:
        if connection:
            cursor.close()
            connection.close()

def update_credentials_in_db(user_id, new_email, new_password):
    try:
        connection = psycopg2.connect(
            dbname="registration",
            user="postgres",
            password="1234",
            host="localhost",
            port="5432"
        )
        cursor = connection.cursor()

        if new_email and new_password:
            query = "UPDATE users SET email = %s, password = %s WHERE id = %s"
            cursor.execute(query, (new_email, new_password, user_id))
        elif new_email:
            query = "UPDATE users SET email = %s WHERE id = %s"
            cursor.execute(query, (new_email, user_id))
        elif new_password:
            query = "UPDATE users SET password = %s WHERE id = %s"
            cursor.execute(query, (new_password, user_id))
        else:
            return {"status": "error", "message": "No new credentials provided"}

        connection.commit()
        return {"status": "success", "message": "Credentials updated successfully"}

    except psycopg2.Error as e:
        return {"status": "error", "message": str(e)}

    finally:
        if connection:
            cursor.close()
            connection.close()
def run_server():
    server_address = ('localhost', 8000)
    httpd = HTTPServer(server_address, RegistrationServer)
    print("Server running on http://localhost:8000")
    httpd.serve_forever()

if __name__ == "__main__":
    run_server()
