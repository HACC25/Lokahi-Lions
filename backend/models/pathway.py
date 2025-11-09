from backend.database import db

# Define model of a UH Manoa Degree Pathway
class Pathway(db.Model):
  program_name = db.Column(db.String(200), primary_key=True)
  institution = db.Column(db.String(100), nullable=False)
  total_credits = db.Column(db.String(10), nullable=False)
  years = db.Column(db.Text, nullable=False)