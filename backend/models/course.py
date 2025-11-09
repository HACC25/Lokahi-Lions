from backend.database import db
from sqlalchemy import Column, Integer, String, Text

# Define model of a Course
class Course(db.Model):
  __bind_key__ = 'courses'
  __tablename__ = 'courses'
  id = Column(Integer, primary_key=True, autoincrement=True)
  course_prefix = Column(String(10), nullable=False, default='')
  course_number = Column(String(10), nullable=False, default='')
  course_title = Column(String(100), nullable=False, default='')
  course_desc = Column(Text, nullable=False, default='')
  num_units = Column(String(10), nullable=False, default='')
  dept_name = Column(String(100), nullable=False, default='')
  inst_ipeds = Column(String(20), nullable=False, default='')
  data = Column(Text, nullable=False, default='')

  def __repr__(self):
      return f"<Course {self.course_prefix} {self.course_number}: {self.course_title}>"

class PcattCourse(db.Model):
  id = Column(Integer, primary_key=True, autoincrement=True)
  course_prefix = Column(String(10), nullable=False, default='')
  course_number = Column(String(10), nullable=False, default='')
  course_title = Column(String(100), nullable=False, default='')
  course_desc = Column(Text, nullable=False, default='')
  dept_name = Column(String(100), nullable=False, default='')
  inst_ipeds = Column(String(20), nullable=False, default='')
  data = Column(Text, nullable=False, default='')

  def __repr__(self):
      return f"<PcattCourse {self.course_prefix} {self.course_number}: {self.course_title}>"
