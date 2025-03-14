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

async function getPlayersByTournament(tid) {
  const [rows] = await pool.query(
    `SELECT * FROM player_details WHERE pid IN (SELECT pid FROM tournament_entry WHERE tid = ${tid});`
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
    ageCategory,
  ]);
};

const getAllTournaments = async () => {
  const [rows] = await pool.query(`select * from tournament_details;`);
  return rows;
};

const getSpecificTournament = async (tid) => {
  const [rows] = await pool.query(
    `select * from tournament_details where tid = ${tid};`
  );
  return rows;
};

//tournament entry related functions
const createEntry = async (pid, tid, tevent) => {
  const query = `insert into tournament_entry(pid,tid,tevent) values (?,?,?);`;
  await pool.query(query, [pid, tid, tevent]);
};

const getTentryid = async (tid, pid) => {
  const [rows] = await pool.query(
    `select tentryid from tournament_entry where pid = ${pid} and tid = ${tid} ;`
  );
  return rows;
};

//Add certificate
const addPartiCerti = async (tid, pid, url) => {
  const query =
    "insert into certificate_of_participation (tid,pid,certficateUrl) values (?,?,?)";
  await pool.query(query, [tid, pid, url]);
};

const addMeritCerti = async (tid, pid, url) => {
  const query =
    "insert into certificate_of_merit (tid,pid,certficateUrl) values (?,?,?)";
  await pool.query(query, [tid, pid, url]);
};

//Result related function
const addIndividualResult = async (tentryid, position) => {
  const query =
    "insert into individual_results (tentryid,position) values (?,?)";
  await pool.query(query, [tentryid, position]);
};

const addTeamResult = async (tid, event, gender, position) => {
  const query =
    "insert into team_results (tid,event,gender,position) values (?,?,?,?)";
  await pool.query(query, [tid, event, gender, position]);
};

const addChampionshipResult = async (tid, gender, position) => {
  const query =
    "insert into championship_results (tid,gender,position) values (?,?,?)";
  await pool.query(query, [tid, gender, position]);
};

const getUpcomingTournamentsForPlayer = async (pid) => {
  const[rows] = await pool.query(`select * from tournament_details where tid in (select tid from tournament_entry where pid = ${pid} );
`)
 const tournament = rows;
 const currDate = new Date();

const upcomingTournaments = tournament.filter((tournament) => new Date(tournament.endDate) > currDate)
      
return upcomingTournaments;
}

const getLatestTournaments = async () => {
  const currDate = new Date();
  const tournaments = await getAllTournaments();
  
  const latestTournaments = tournaments
      .filter((tournament) => new Date(tournament.endDate) < currDate)
      .sort((a, b) => new Date(a.endDate) - new Date(b.endDate))
      .slice(0, 5);
  /*
  const arra = new Array();
  tournaments.map((tournament) => {
    if (currDate > tournament.endDate) {
      arra.push(tournament);
    }
  });

  arra.sort((a, b) => a.endDate - b.endDate);
  const latestTournaments = new Array();
  for (let i = 0; i < 5; i++) {
    latestTournaments.push(arra[i]);
  }*/
  return latestTournaments;
};

const getChampionshipResult= async()=>{
  const [rows] = await pool.query(`SELECT 
    tournament_details.title, 
    tournament_details.tlevel, 
    tournament_details.ageCategory, 
    championship_results.gender, 
    championship_results.position 
FROM tournament_details
JOIN championship_results ON championship_results.tid = tournament_details.tid
ORDER BY 
FIELD(tournament_details.tlevel, 'International', 'National', 'State', 'District'),
FIELD(championship_results.position, 'First', 'Second', 'Third');
;
`);
  return rows;
}
const getTeamResult= async(tid)=>{
  const [rows] = await pool.query(`select event,gender,position from team_results WHERE tid = ${tid};`);
  return rows;
}
const getIndivisualResult= async(tid)=>{
 const [rows] = await pool.query(`
  SELECT 
    player_details.fullName,
    player_details.eventName,  -- Added missing comma
    individual_results.position
FROM tournament_entry
JOIN player_details ON player_details.pid = tournament_entry.pid
JOIN individual_results ON individual_results.tentryid = tournament_entry.tentryid
WHERE tournament_entry.tid = ${tid};
  `);
  return rows;
}

const getIndividualResultForPlayer = async (pid)=>{
  const [rows] = await pool.query(`SELECT 
    tournament_details.title, 
    individual_results.position
FROM tournament_entry
JOIN tournament_details ON tournament_details.tid = tournament_entry.tid
JOIN individual_results ON individual_results.tentryid = tournament_entry.tentryid
WHERE tournament_entry.pid = ${pid};`)
return rows;
}
// sort

const sortbyevent = async (event) => {
  const [rows] = await pool.query(
    `select * from player_details where eventName = "${event}";`
  );
  return rows;
};

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
  getSpecificTournament,
  sortbyevent,
  createEntry,
  addIndividualResult,
  addTeamResult,
  addChampionshipResult,
  getPlayersByTournament,
  getTentryid,
  getLatestTournaments,
  getChampionshipResult,
  getIndivisualResult,
  getTeamResult,getUpcomingTournamentsForPlayer,getIndividualResultForPlayer
};
