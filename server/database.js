import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "soham",
    database: "project",
  })
  .promise();

//Get all players
async function getPlayers() {
  const [rows] = await pool.query(
    `select * from player_details where requestStatus = "Accepted";`
  );
  return rows;
}

async function getSinglePlayer(pid) {
  const [rows] = await pool.query(
    `select * from player_details where pid=${pid};`
  );
  return rows;
}

async function lastId() {
  const [rows] = await pool.query(
    `select LAST_INSERT_ID(pid) from player_details;`
  );
  return rows;
}

async function insertplayer(
  fullName,
  gender,
  dob,
  aadharCardNumber,
  eventName,
  email,
  phone,
  addressLine1,
  addressLine2,
  pincode,
  schoolCollegeName,
  photo,
  aadharCardPhoto
) {
  const query = `INSERT INTO player_details (
      fullName,
      gender,
      dob,
      aadharCardNumber,
      eventName,
      email,
      phone,
      addressLine1,
      addressLine2,
      pincode,
      schoolCollegeName,
      photo,
      aadharCardPhoto
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // // Execute the query with the provided values
  await pool.query(query, [
    fullName,
    gender,
    dob,
    aadharCardNumber,
    eventName,
    email,
    phone,
    addressLine1,
    addressLine2,
    pincode,
    schoolCollegeName,
    photo,
    aadharCardPhoto,
  ]);
}

//admin related functions
//getting accepting and rejecting player
async function getPendingPlayers() {
  const [rows] = await pool.query(
    `select * from player_details where requestStatus = "pending";`
  );
  return rows;
}

async function acceptPlayer(pid) {
  await pool.query(
    `update player_details set requestStatus = "Accepted" where pid = ${pid};`
  );
}

async function rejectPlayer(pid) {
  await pool.query(
    `update player_details set requestStatus = "Rejected" where pid = ${pid};`
  );
}


//Tournament related function
const addTournament = async (
  title,
  startingDate,
  endDate,
  locationState,
  locationCity,
  tlevel,
  ageCategory
) => {
  const query = `insert into tournament_details(title,startingDate,endDate,locationState,locationCity,tlevel,ageCategory) values (?,?,?,?,?,?,?);`;
  await pool.query(query, [
    title,
    startingDate,
    endDate,
    locationState,
    locationCity,
    tlevel,
    ageCategory
  ]);
};

const getAllTournaments = async () => {
  const [rows] = await pool.query(
    `select * from tournament_details;`
  );
  return rows;
}

const getSpecificTournament = async (tid) => {
  const [rows] = await pool.query(
    `select * from tournament_details where tid = ${tid};`
  );
  return rows; 
}



//tournament entry related functions
const createEntry = async (pid, tid,tevent) => {
  const query = `insert into tournament_entry(pid,tid,tevent) values (?,?,?);`;
  await pool.query(query, [pid, tid,tevent]);
};


//Add certificate
const addPartiCerti = async (tid , pid ,url) => {
  const query = "insert into certificate_of_participation (tid,pid,certficateUrl) values (?,?,?)"
  await pool.query(query,[tid,pid,url]);
}

const addMeritCerti = async (tid , pid ,url) => {
  const query = "insert into certificate_of_merit (tid,pid,certficateUrl) values (?,?,?)"
  await pool.query(query,[tid,pid,url]);
}


//Add Result

const addIndividualResult = async (tentryid,position) => {
  const query = "insert into individual_results (tentryid,position) values (?,?)"
  await pool.query(query,[tentryid,position]);  
}

const addTeamResult = async (tid,event,gender,position) => {
  const query = "insert into team_results (tid,event,gender,position) values (?,?,?,?)"
  await pool.query(query,[tid,event,gender,position]);
}

const addChampionshipResult = async (tid,gender,position) => {
  const query = "insert into championship_results (tid,gender,position) values (?,?,?)"
  await pool.query(query,[tid,gender,position]);
}


// sort


const sortbyevent = async (event) => {
  const [rows] = await pool.query(
    `select * from player_details where eventName = "${event}";`
  );
  return rows;
}

export {
  pool,
  getPlayers,
  getSinglePlayer,
  lastId,
  insertplayer,
  getPendingPlayers,
  acceptPlayer,
  rejectPlayer,
  addTournament,
  addPartiCerti,
  addMeritCerti,
  getAllTournaments,
  getSpecificTournament,sortbyevent,
  createEntry,
  addIndividualResult,
  addTeamResult,
  addChampionshipResult
};
