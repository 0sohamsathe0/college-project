import { getPendingPlayers , acceptPlayer , rejectPlayer , addTournament, addPartiCerti , addMeritCerti ,getAllTournaments , sortbyevent , createEntry,addIndividualResult , addTeamResult,addChampionshipResult , getTentryid , getLatestTournaments,getChampionshipResult,getIndivisualResult,getTeamResult,getSinglePlayer } from "../database.js";
import{sendAcceptedMail,sendRejectionMail} from "../utils/nodemailer.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const handleGetRequestdPlayers = async (req, res) => {
  const requestedPlayers = await getPendingPlayers();

  const formatDate = (isoDate) => {
   const date = new Date(isoDate);
   return((date.getDate()+"/" + (date.getMonth()+1) +"/"+ date.getFullYear() ).toString());
 };
 
 // Update the dob property directly in the original array
 requestedPlayers.forEach((item) => {
   item.dob = formatDate(item.dob);
 });

  if (!requestedPlayers) {
    return res.json({ message: "No Pending Players present" });
  }
  res.send(requestedPlayers);
};


//player realted controllers
const handleAcceptPlayer = async(req,res)=>{
   const {pid} = req.params   
   try {
      const player = await getSinglePlayer(pid);
      const email = player[0].email;
      const indexOfSpace = player[0].fullName.indexOf(' ')
      const pname = player[0].fullName.slice(0, indexOfSpace)
      console.log(pname,email);
      
      sendAcceptedMail(pname,email)

      await acceptPlayer(pid);
   } catch (error) {
      console.log(error);
   }
   res.status(200).json({message : `player Accepted with player id ${pid}`})
}

const handleRejectPlayer = async(req,res)=>{
   const pid = req.params.pid;
   try {
      const player = await getSinglePlayer(pid);
      const email = player[0].email;
      const indexOfSpace = player[0].fullName.indexOf(' ')
      const pname = player[0].fullName.slice(0, indexOfSpace)
      console.log(pname,email);
      
      sendRejectionMail(pname,email)

      await rejectPlayer(pid);
   } catch (error) {
      console.log(error);
   }
   res.status(200).json({message : `player rejected with player id ${pid}`})
}


//tournament realted controllers
const handleAddTournament = async(req,res)=>{
 const { 
   title,
   startingDate,
   endDate,
   locationState,
   locationCity,
   tlevel,
   ageCategory
} = req.body


if(!title || !startingDate || !endDate || !locationState || !locationCity || !tlevel || !ageCategory){
   return res.status(400).json({ message : "all fields are required"})
}

await addTournament(title,startingDate,endDate,locationState,locationCity,tlevel,ageCategory);

res.status(200).json({ message : `Tournament added successfully `,title : `${title}`})
}

const handleGetAllTournament =async (req,res) => {
   const allTournaments = await getAllTournaments();
   if(!allTournaments){return res.status(400).json({ message : "No tournaments Available to display"})}
   res.send(allTournaments)
}



//result related controllers
const handleAddIndividualResult = async (req,res) => {
   const { tentryid , position} = req.body;

   if(!tentryid || !position ){
      return res.status(400).json({ message : "all fields are required"})
   }
   try {
      await addIndividualResult(tentryid,position);
      res.status(200).json({ message : "Individual result added successfully " })
   } catch (error) {
      res.status(400).json({ "Error Message" : error })

   }
   
}
const handleAddTeamResult = async (req,res) => {
   const {tid,event,gender,position} = req.body;
   
   if(!tid || !event || !gender || !position ){
      return res.status(400).json({ message : "all fields are required"})
   }
   try {
      await addTeamResult(tid,event,gender,position);
      res.status(200).json({ message : "Team result added successfully " })
   } catch (error) {
      res.status(400).json({"Error Message":error})
   }
   
}

const handleAddChampionshipResult = async (req,res) => {
   const{tid,gender,position} = req.body;
   if(!tid|| !gender || !position){
      return res.status(400).json({ message : "all fields are required"})
   }
   try { 
   await addChampionshipResult(tid,gender,position);
   res.status(200).json({ message : "Championship result added successfully " })
   } catch (error) {
      res.status(400).json({message:error})
   }
}

const handleGetTentry = async(req,res)=>{
   const {tid,pid}=req.params;
   if(!tid || !pid){
      return res.status(400).json({message : "all fields are required"})
   }
   const tentryid = await getTentryid(tid,pid);
   console.log(tentryid);
   res.status(200).json({ 'tentryid':tentryid})
}

const handleGetLatestTournaments = async(req,res)=>{
 const tournaments = await getLatestTournaments();
 var filtered = tournaments.filter(function (el) {
   return el != null;
 });

 return res.status(200).json({filtered})
}


const handleGetChampionshipResult = async(req,res)=>{
   const result = await getChampionshipResult();
   if(!result){}
   res.status(200).json(result)
}

const handleGetTeamResult = async(req,res)=>{
   const {tid}= req.params;
   if(!tid){
     return res.status(400).json({message:"please enter tid"})
   }
   const result = await getTeamResult(tid)
   res.status(200).json(result)
  }
  
const handleGetIndividual = async(req,res)=>{
   const {tid} = req.params;
   if(!tid){
      return res.status(400).json({message : "please enter tid"})
   }

   const result = await getIndivisualResult(tid);
   res.status(200).json(result);
}



//certificates related controllers
const handleAddMeritCertificate = async (req,res) => {
   const { tid , pid} = req.body;
   const certificatePhoto = req.file;
   if(!tid || !pid || !certificatePhoto ){
      return res.status(400).json({ message : "all fields are required"})
   }
   const certificateUrl = await uploadOnCloudinary(certificatePhoto.path);

   await addMeritCerti(tid,pid,certificateUrl);
   res.status(200).json({ message : "Merit cerificate added successfully " })
  
}

const handleAddParticipationCertificate = async (req,res) => {
   const { tid , pid} = req.body;
   const certificatePhoto = req.file;
   if(!tid || !pid || !certificatePhoto ){
      return res.status(400).json({ message : "all fields are required"})
   }
   const certificateUrl = await uploadOnCloudinary(certificatePhoto.path);

   await addPartiCerti(tid,pid,certificateUrl);
   res.status(200).json({ message : "participation cerificate added successfully " })
}



const handleEventSort = async(req,res)=>{
   const {event} = req.body;
   const result = await sortbyevent(event)

   const formatDate = (isoDate) => {
      const date = new Date(isoDate);
      return((date.getDate()+"-" + (date.getMonth()+1) +"-"+ date.getFullYear() ).toString());
    };
    
    // Update the dob property directly in the original array
    result.forEach((item) => {
      item.dob = formatDate(item.dob);
    });
   res.status(200).json(result)
}

const handleCreateEntry = async(req,res)=>{
   const {tid , pid , tevent} = req.body;
   if(!tid || !pid || !tevent){
      return res.status(400).json({ message : "all fields are required"})
   }
   await createEntry(pid,tid,tevent);
   res.status(200).json({ message : "Entry created successfully " })
}

const handleAdminLogin = async(req,res)=>{
   const {userid , password } = req.body;
   if (!userid && !password) {
     res.status(400).json({message : "Userid and password both are required"}) 
   }

   if(userid == "admin" && password == "123456"){
     res.send("login successful") 
   }
   else{
      res.send("wrong credentials")
   }
}

export { handleGetRequestdPlayers , handleAcceptPlayer ,handleRejectPlayer ,handleAddTournament ,handleAddMeritCertificate ,handleAddParticipationCertificate , handleGetAllTournament,handleEventSort ,handleAddIndividualResult,handleAddTeamResult,handleAddChampionshipResult, handleCreateEntry, handleGetTentry,handleGetLatestTournaments,handleGetChampionshipResult, handleGetIndividual,handleGetTeamResult};
