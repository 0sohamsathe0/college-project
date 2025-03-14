import express from 'express';
import { handleGetRequestdPlayers , handleAcceptPlayer ,handleRejectPlayer ,handleAddTournament ,handleAddMeritCertificate ,handleAddParticipationCertificate ,handleAddIndividualResult,handleAddTeamResult,handleGetAllTournament,handleAddChampionshipResult,handleEventSort,handleCreateEntry,handleGetTentry,handleGetLatestTournaments,handleGetChampionshipResult , handleGetIndividual,handleGetTeamResult} from "../controllers/admin.controller.js"
import { upload } from "../middlewares/multer.middelware.js";

const router = express.Router()


router.post('/login' , (req , res)=>{
    // router code here
})

//player update related routes
router.get('/reqest-queue', handleGetRequestdPlayers)
router.post("/accept-player/:pid" , handleAcceptPlayer)
router.post("/reject-player/:pid" , handleRejectPlayer)


//toutnament update related routes
router.post("/add-tournament" , handleAddTournament)
router.get("/getAllTournaments" ,handleGetAllTournament)


//certificate update related routs
router.post("/add-certificate/merit",upload.single('certificatePhoto'),handleAddMeritCertificate)
router.post("/add-certificate/participation",upload.single('certificatePhoto'),handleAddParticipationCertificate)

router.get("/eventWiseSort",handleEventSort);

//result update related routs
router.post("/add-result/individual" ,handleAddIndividualResult)
router.post("/add-result/team" , handleAddTeamResult)
router.post("/add-result/championship" , handleAddChampionshipResult)
router.get("/getTentry/:tid/:pid" ,handleGetTentry)
router.get("/latest-tournaments" , handleGetLatestTournaments)
router.get("/getChampionshipResult", handleGetChampionshipResult);
router.get("/getIndividualResult/:tid", handleGetIndividual);
router.get("/getTeamResult/:tid" , handleGetTeamResult);

// entry related routes
router.post("/createEntry" ,handleCreateEntry);

export default router;