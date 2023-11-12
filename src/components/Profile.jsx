import { useState, useEffect } from "react";

const Profile = () => {

  return (
    <div className="container mt-3">
      <h2 className="text-center">Profile</h2>
      <div
        className="card"
        style={{ backgroundColor: "#f2f2f2" }}
      >
        <div className="row">
          <div className="col-md-6">
         
              <div className="form-group">
                <label htmlFor="Title" className="form-label" style={{ color: 'black' }}>
                  Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter book title"
                  name="title"
                  value={'Dao Cong Van'}
                 
                />
            </div>
            <div className="form-group">
                <label htmlFor="Title" className="form-label" style={{ color: 'black', marginTop: '10px' }}>
                  Student ID:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter book title"
                  name="title"
                  value={'B20DCCN719'}
                 
                />
            </div>
            <div className="form-group">
                <label htmlFor="Title" className="form-label" style={{ color: 'black', marginTop: '10px' }}>
                  Email:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter book title"
                  name="title"
                  value={'VanDC.B20CN719@ptit.stu.edu.vn'}
                 
                />
            </div>
            <div className="form-group">
                <label className="form-label" style={{ color: 'black', marginTop: '10px' }}>Gender:</label>
                <input
                  type="text"
                  className="form-control"
                  id="book-release-date"
                  name="publishedDate"
                  value={"Male"}
                  
                />
              </div>
            
            
              <div className="form-group">
                <label className="form-label" style={{ color: 'black', marginTop: '10px' }}>Birthday:</label>
                <input
                  type="date"
                  className="form-control"
                  id="book-release-date"
                  name="publishedDate"
                  value={"16/01/2002"}
                  
                />
              </div>
            
            {/* <div className="form-group">
              <label className="form-label" style={{ color: 'black', marginTop: '10px' }}>Address:</label>
              <textarea
                className="form-control"
                id="book-category"
                name="category"
                value={"Kien Thuy, Hai Phong"}
            
              />
              
            </div> */}
            
            <div className="form-group">
              <label className="form-label" style={{ color: 'black', marginTop: '10px' }}>About:</label>
              <textarea
                className="form-control"
                id="book-category"
                name="category"
                value={"Well done is better than well said."}
              />
              
            </div>
          </div>
          <div className="col-md-6">
            <h2 style={{ color: 'black' }}>Upload Avatar</h2>
            <div className="form-group">
              <label className="form-label" style={{ color: 'black' }}>Choose a file</label>
              <div className="mb-3">
                <input
                type="file"
                style={{ color: 'black' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12 d-flex justify-content-end">
         
        </div>
      </div>
    </div>
  );
};

export default Profile;
