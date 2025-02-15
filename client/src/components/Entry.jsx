import { useState } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const Entry = () => {
  const entries = [
    {
      id: 1,
      name: "Aryan Sharma",
      dob: "2005-06-15",
      schoolName: "Delhi Public School",
      event: "Epee",
      gender: "Male",
    },
    {
      id: 2,
      name: "Soham Patel",
      dob: "2006-02-20",
      schoolName: "St. Xavier's",
      event: "Epee",
      gender: "Male",
    },
    {
      id: 3,
      name: "Rahul Singh",
      dob: "2004-12-12",
      schoolName: "DAV Public School",
      event: "Epee",
      gender: "Male",
    },
    {
      id: 4,
      name: "Amit Kumar",
      dob: "2005-08-30",
      schoolName: "Kendriya Vidyalaya",
      event: "Epee",
      gender: "Male",
    },
    {
      id: 5,
      name: "Neha Verma",
      dob: "2005-09-25",
      schoolName: "National Public School",
      event: "Epee",
      gender: "Female",
    },
    {
      id: 6,
      name: "Priya Mehta",
      dob: "2007-11-08",
      schoolName: "Ryan International",
      event: "Epee",
      gender: "Female",
    },
    {
      id: 7,
      name: "Sneha Das",
      dob: "2006-04-22",
      schoolName: "DPS Kolkata",
      event: "Epee",
      gender: "Female",
    },
    {
      id: 8,
      name: "Ananya Roy",
      dob: "2005-10-14",
      schoolName: "Loreto Convent",
      event: "Epee",
      gender: "Female",
    },
    {
      id: 9,
      name: "Vikram Joshi",
      dob: "2006-06-18",
      schoolName: "Modern School",
      event: "Foil",
      gender: "Male",
    },
    {
      id: 10,
      name: "Rohan Gupta",
      dob: "2007-07-11",
      schoolName: "City International",
      event: "Foil",
      gender: "Male",
    },
    {
      id: 11,
      name: "Aditya Rao",
      dob: "2005-03-05",
      schoolName: "Bishop's School",
      event: "Foil",
      gender: "Male",
    },
    {
      id: 12,
      name: "Kunal Jain",
      dob: "2006-12-09",
      schoolName: "St. Paul's",
      event: "Foil",
      gender: "Male",
    },
    {
      id: 13,
      name: "Riya Sen",
      dob: "2005-05-18",
      schoolName: "Springdale School",
      event: "Foil",
      gender: "Female",
    },
    {
      id: 14,
      name: "Sanya Kapoor",
      dob: "2006-09-07",
      schoolName: "Holy Cross",
      event: "Foil",
      gender: "Female",
    },
    {
      id: 15,
      name: "Pooja Sharma",
      dob: "2004-08-21",
      schoolName: "Mount Carmel",
      event: "Foil",
      gender: "Female",
    },
    {
      id: 16,
      name: "Divya Reddy",
      dob: "2005-01-13",
      schoolName: "Sunbeam School",
      event: "Foil",
      gender: "Female",
    },
    {
      id: 17,
      name: "Siddharth Menon",
      dob: "2006-04-30",
      schoolName: "Greenwood High",
      event: "Sabre",
      gender: "Male",
    },
    {
      id: 18,
      name: "Harsh Tiwari",
      dob: "2007-10-09",
      schoolName: "DAV Public School",
      event: "Sabre",
      gender: "Male",
    },
    {
      id: 19,
      name: "Kabir Saxena",
      dob: "2005-07-12",
      schoolName: "New Horizon",
      event: "Sabre",
      gender: "Male",
    },
    {
      id: 20,
      name: "Manoj Pillai",
      dob: "2006-11-25",
      schoolName: "Cambridge School",
      event: "Sabre",
      gender: "Male",
    },
    {
      id: 21,
      name: "Meera Nair",
      dob: "2005-08-08",
      schoolName: "Sacred Heart",
      event: "Sabre",
      gender: "Female",
    },
    {
      id: 22,
      name: "Asha Iyer",
      dob: "2006-03-16",
      schoolName: "Bethany High",
      event: "Sabre",
      gender: "Female",
    },
    {
      id: 23,
      name: "Kiran Mishra",
      dob: "2004-12-19",
      schoolName: "International School",
      event: "Sabre",
      gender: "Female",
    },
    {
      id: 24,
      name: "Tanya Rathi",
      dob: "2005-09-22",
      schoolName: "National Academy",
      event: "Sabre",
      gender: "Female",
    },
  ];

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`Player Entries`);

    worksheet.addRow(["Sr. No.", "Name", "DOB", "School Name", "Event"]);

    entries
      .filter((entry) => entry.gender === gender)
      .forEach((entry, index) => {
        worksheet.addRow([
          index + 1,
          entry.name,
          entry.dob,
          entry.schoolName,
          entry.event,
        ]);
      });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `${gender.toLowerCase()}_entries.xlsx`);
  };

  return (
    <div className="p-4">
      <button
        onClick={() => exportToExcel("Male")}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded mr-2"
      >
        Export Boys to Excel
      </button>
      <button
        onClick={() => exportToExcel("Female")}
        className="mt-4 px-4 py-2 bg-pink-500 text-white rounded"
      >
        Export Girls to Excel
      </button>
    </div>
  );
};

export default Entry;
