import { getPendingPlayers , acceptPlayer , rejectPlayer , addTournament, addPartiCerti , addMeritCerti ,getAllTournaments , sortbyevent , createEntry} from "../database.js";
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
   const pid = req.params.pid;
   try {
      await acceptPlayer(pid);
   } catch (error) {
      console.log(error);
   }
   res.status(200).json({message : `player Accepted with player id ${pid}`})
}

const handleRejectPlayer = async(req,res)=>{
   const pid = req.params.pid;
   try {
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
   
}

const handleAddTeamResult = async (req,res) => {
   
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

   await createEntry(tid,pid,tevent);

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

export { handleGetRequestdPlayers , handleAcceptPlayer ,handleRejectPlayer ,handleAddTournament ,handleAddMeritCertificate ,handleAddParticipationCertificate ,handleAddIndividualResult,handleAddTeamResult , handleGetAllTournament,handleEventSort , handleCreateEntry};
