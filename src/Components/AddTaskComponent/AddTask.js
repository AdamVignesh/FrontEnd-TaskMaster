import React, { useState } from 'react'

function AddTask() {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        file: null,
        deadline: '',
        startDate: '',
        endDate: '',
        status: '',
        weightage: 0,
      });
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFormData({ ...formData, file });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission, e.g., send data to server
        console.log(formData);
      };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>File:</label>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
        />
      </div>
      <div>
        <label>Deadline:</label>
        <input
          type="datetime-local"
          name="deadline"
          value={formData.deadline}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Status:</label>
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Weightage:</label>
        <input
          type="number"
          name="weightage"
          value={formData.weightage}
          min={1}
          max={10}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default AddTask