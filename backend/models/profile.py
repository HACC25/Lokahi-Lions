from backend.database import db

# Define model of a user Profile
class Profile(db.Model):
    email = db.Column(db.String(50), primary_key=True)
    password = db.Column(db.String(100), nullable=False)
    # Add other fields as necessary

    def __repr__(self):
        return f"<Profile {self.email}>"