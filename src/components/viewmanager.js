"use client";

import React, { useState, useRef, useEffect } from "react";
import "./style/viewmanager.css"; // import css file

const ViewManager = ({
  views,
  isViewDialogOpen,
  setIsViewDialogOpen,
  handleButtonClick,
  viewName,
  setViewName,
  levelView,
  setLevelView,
  handleCloseViewDialog,
  handleAddView,
  showSidebarLeft,
  setShowSidebarLeft,
  handleDeleteView,
  handleEditView,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null); // To track which dropdown is open
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false); // ++++++++++++++++ เพิ่ม state สำหรับ Rename Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // ++++++++++++++++ เพิ่ม state สำหรับ Delete Modal
  const [selectedView, setSelectedView] = useState(null); // ++++++++++++++++ เก็บข้อมูล View ที่ถูกเลือก (สำหรับ Rename/Delete)
  const [newViewName, setNewViewName] = useState(""); // ++++++++++++++++ เก็บชื่อใหม่สำหรับ Rename
  const [newLevelView, setNewLevelView] = useState(); // ++++++++++++++++ เก็บชื่อใหม่สำหรับ Rename
  const [searchTerm, setSearchTerm] = useState(""); // ++++++++++++++++ เพิ่ม state สำหรับเก็บคำค้นหา
  const dropdownRefs = useRef([]); // Store refs for each dropdown
  const user_id = localStorage.getItem("user_id"); // Get user_id จาก localStorage
  const user_level = localStorage.getItem("level"); // Get user_id จาก localStorage
  //   console.log("user_level:",user_level);

  // Toggle specific dropdown
  const toggleDropdown = (index) => {
    setIsDropdownOpen(isDropdownOpen === index ? null : index);
  };

  // Handle click outside
  const handleClickOutside = (event) => {
    if (
      isDropdownOpen !== null &&
      dropdownRefs.current[isDropdownOpen] &&
      !dropdownRefs.current[isDropdownOpen].contains(event.target)
    ) {
      setIsDropdownOpen(null);
    }
  };

  // Add event listener for outside clicks
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // ฟังชั่นสำหรับดึงข้อมูลสำหรับ Rename
  const handleRename = (view) => {
    console.log(levelView);
    console.log("Renaming view:", view.name, view.levelView);
    setSelectedView(view); // ++++++++++++++++ ตั้งค่า View ที่เลือก
    setNewViewName(view.name); // ++++++++++++++++ ดึงชื่อ View ปัจจุบันมาใส่ใน input
    setNewLevelView(view.levelView); // ++++++++++++++++ ดึง Level View ปัจจุบันมาใส่ใน input
    setIsRenameModalOpen(true); // ++++++++++++++++ เปิด Rename Modal
    setIsDropdownOpen(null); // ปิด Dropdown หลังเลือกเมนู
  };

  // ฟังชั่นสำหรับดึงข้อมูลสำหรับ Delete
  const handleDelete = (view) => {
    console.log("Deleting view:", view.name);
    setSelectedView(view); // ++++++++++++++++ ตั้งค่า View ที่เลือก
    setIsDeleteModalOpen(true); // ++++++++++++++++ เปิด Delete Modal
    setIsDropdownOpen(null); // ปิด Dropdown หลังเลือกเมนู
  };

  // Confirm Rename
  const confirmRename = () => {
    console.log(
      "Renamed view & levelView :",
      selectedView.name,
      "and",
      selectedView.levelView,
      "to",
      newViewName,
      "and",
      newLevelView
    ); // ++++++++++++++++ Console log ชื่อใหม่
    // handleEditView(selectedView, newViewName,newLevelView);
    handleEditView(selectedView, newViewName, newLevelView);
    setIsRenameModalOpen(false); // ++++++++++++++++ ปิด Rename Modal
  };

  // Confirm Delete
  const confirmDelete = () => {
    console.log("Deleted view:", selectedView.name); // ++++++++++++++++ Console log การลบ
    handleDeleteView(selectedView);
    setIsDeleteModalOpen(false); // ++++++++++++++++ ปิด Delete Modal
  };

  // ฟิลเตอร์ Views ตามชื่อที่ค้นหา
  const filteredViews = views.filter((view) =>
    (view.name ?? "")
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {showSidebarLeft && (
        <div className="container" style={{ maxWidth: "282px" }}>
          {/* <p>{viewCategory}</p> */}
          <div className="card mb-3">
            <div className="card-body">
              {/* ช่องค้นหาพร้อมไอคอน Search ++++++++++++++++++++++++++++++++++++*/}
              <div className="input-group mb-3">
                <span className="input-group-text bg-white border-end-0">
                  {/*  ไอคอน Search */}
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0" // ลบขอบซ้ายเพื่อความต่อเนื่อง
                  placeholder="Search views..." // ++++++++++++++++ ข้อความ Placeholder
                  value={searchTerm} // ++++++++++++++++ เชื่อมกับ state searchTerm
                  onChange={(e) => setSearchTerm(e.target.value)} // ++++++++++++++++ อัปเดตค่าการค้นหา
                />
              </div>

              {/* My view ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
              <div className="d-flex justify-content-between">
                <h6 className="card-title fw-bold">My views</h6>
                {/* +++++++++ ปุ่ม Add views ++++++++++ */}
                <i
                  className="bi bi-plus-square me-2 icon-hover"
                  onClick={() => setIsViewDialogOpen(true)}
                ></i>
              </div>
              <hr />
              {/*  Filter My View */}
			  <div className="views-section">
              {filteredViews
                .filter(
                  (view) => view.levelView === 1 && view.id_user === user_id
                ) // กรองข้อมูลตาม levelView และ id_user
                .map((view, index) => (
                  <div
                    key={`myview-${index}`} // เปลี่ยน key ให้เป็นเอกลักษณ์
                    className="d-flex align-items-center justify-content-between py-2 px-2 mb-1 hover-list-view-bg"
                  >
                    <i className="bi bi-table me-2"></i>
                    <button
                      className="btn btn-link text-start text-dark p-0 pe-1 text-decoration-none view-menu-text"
                      onClick={() => handleButtonClick(view)}
                    >
                      {view.name}
                    </button>

                    {/* Dropdown Menu */}
                    <div
                      className="dropdown"
                      ref={(el) =>
                        (dropdownRefs.current[`myview-${index}`] = el)
                      } // เปลี่ยน ref key
                    >
                      <button
                        className="btn btn-light btn-sm"
                        onClick={() => toggleDropdown(`myview-${index}`)} // เปลี่ยน toggle key
                      >
                        <i className="bi bi-three-dots-vertical"></i>
                      </button>

                      {isDropdownOpen === `myview-${index}` && (
                        <ul
                          className="dropdown-menu show mt-1 shadow-sm"
                          style={{ 
							display: "block",
							position: "absolute",
							right: 0,
							zIndex: 1000,
							padding: "0.25rem 0", // ลด padding ด้านบนและล่าง
							minWidth: "120px",    // กำหนดความกว้างขั้นต่ำให้แคบลง
							fontSize: "0.875rem"  // ลดขนาดตัวอักษร
						  }}
                        >
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => handleRename(view)}
                            >
                              Rename
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item text-danger"
                              onClick={() => handleDelete(view)}
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
				</div>

              {/* All Views  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
              <div className="d-flex justify-content-between pt-3">
                <h6 className="card-title fw-bold">All views</h6>
              </div>
              <hr />
              {/* Filter All View */}
			  <div className="views-section">
              {filteredViews
                .filter((view) => view.levelView === 2) // กรองข้อมูลตาม levelView
                .map((view, index) => (
                  <div
                    key={`allview-${index}`} // เปลี่ยน key ให้เป็นเอกลักษณ์
                    className="d-flex align-items-center justify-content-between py-2 px-2 mb-1 hover-list-view-bg"
                  >
                    <i className="bi bi-table me-2"></i>
                    <button
                      className="btn btn-link text-start text-dark p-0 text-decoration-none view-menu-text"
                      onClick={() => handleButtonClick(view)}
                    >
                      {view.name}
                    </button>

                    {/* Dropdown Menu */}
                    <div
                      className="dropdown"
                      ref={(el) =>
                        (dropdownRefs.current[`allview-${index}`] = el)
                      } // เปลี่ยน ref key
                    >
                      {/* เปลี่ยน toggle key แสดงปุ่มเฉพาะเมื่อ user_level ไม่ใช่ 1 */}
                      {user_level !== "1" && (
                        <button
                          className="btn btn-light btn-sm"
                          onClick={() => toggleDropdown(`allview-${index}`)}
                        >
                          <i className="bi bi-three-dots-vertical"></i>
                        </button>
                      )}

                      {isDropdownOpen === `allview-${index}` && (
                        <ul
                          className="dropdown-menu show mt-1 shadow-sm"
                          style={{ 
							display: "block",
							position: "absolute",
							right: 0,
							zIndex: 1000,
							padding: "0.25rem 0", // ลด padding ด้านบนและล่าง
							minWidth: "120px",    // กำหนดความกว้างขั้นต่ำให้แคบลง
							fontSize: "0.875rem"  // ลดขนาดตัวอักษร
						  }}
                        >
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => handleRename(view)}
                            >
                              Rename
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item text-danger"
                              onClick={() => handleDelete(view)}
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
				</div>
            </div>
          </div>

          {/* Add View Dialog */}
          {isViewDialogOpen && (
            <div
              className="modal show d-block"
              tabIndex="-1"
              role="dialog"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Save Your View</h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={handleCloseViewDialog}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>Please enter a name for this View :</p>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="View Name"
                      value={viewName}
                      onChange={(e) => setViewName(e.target.value)}
                    />

					{user_level !== "1" && (
                    <div className="option-view pt-4">
                      {/* Dropdown เลือกประเภท View ************ */}
						{/* Only show the dropdown if user_level is not 1 */}
						
							<>
							<p>Select a view category :</p>
							<select
								className="form-select"
								value={levelView}
								onChange={(e) => setLevelView(e.target.value)}
							>
								<option value="1">My Views</option>
								<option value="2">All Views</option>
							</select>
							</>
						
                    </div>
					)}
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCloseViewDialog}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleAddView}
                      disabled={!viewName.trim()}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Rename Modal */}
          {isRenameModalOpen && ( // ++++++++++++++++ แสดง Rename Modal
            <div
              className="modal show d-block"
              tabIndex="-1"
              role="dialog"
              style={{ 
				backgroundColor: "rgba(0, 0, 0, 0.5)",
			  }}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Rename View</h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => setIsRenameModalOpen(false)} // ++++++++++++++++ ปิด Modal
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>Please enter a new name for this View:</p>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="New View Name"
                      value={newViewName} // ++++++++++++++++ แสดงชื่อใหม่
                      onChange={(e) => setNewViewName(e.target.value)} // ++++++++++++++++ เก็บชื่อใหม่เมื่อผู้ใช้พิมพ์
                    />
					{user_level !== "1" && (
					<div className="option-view pt-4">
						{/* Dropdown เลือกประเภท View ************ */}
						<p>Select a view category :</p>
						<select
						className="form-select"
						value={newLevelView}
						onChange={(e) => setNewLevelView(e.target.value)}
						>
						<option value="1">My Views</option>
						<option value="2">All Views</option>
						</select>
					</div>
					)}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setIsRenameModalOpen(false)} // ++++++++++++++++ ปิด Modal
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={confirmRename} // ++++++++++++++++ ยืนยัน Rename
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Delete Modal */}
          {isDeleteModalOpen && ( // ++++++++++++++++ แสดง Delete Modal
            <div
              className="modal show d-block"
              tabIndex="-1"
              role="dialog"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title text-danger">Confirm Delete</h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => setIsDeleteModalOpen(false)} // ++++++++++++++++ ปิด Modal
                    ></button>
                  </div>
                  <div className="modal-body">
                    {/* // ++++++++++++++++ แสดงชื่อ View ที่จะลบ */}
                    <p>
                      Are you sure you want to delete the view{" "}
                      <strong>{selectedView?.name}</strong> ?
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setIsDeleteModalOpen(false)} // ++++++++++++++++ ปิด Modal
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={confirmDelete} // ++++++++++++++++ ยืนยันการลบ
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ViewManager;
