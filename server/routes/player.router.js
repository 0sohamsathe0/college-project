import express from "express";
import{ getAllPlayers , getPlayerDetail , registerPlayer ,handleGetPartiCerti ,handleGeMeritCerti ,handleLogin, handleVerifyPlayer } from "../controllers/player.controller.js"
import { upload } from "../middlewares/multer.middelware.js";

const router = express.Router()

//get players
router.get("/all-players", getAllPlayers);
router.get("/:pid" , getPlayerDetail);

//login or register
router.post("/",upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'aadharCardPhoto', maxCount: 1 }]) ,registerPlayer);
router.get("/verifyPlayer",handleVerifyPlayer);
router.post("/login", handleLogin);

 // get certificates 
 router.get("/get-participation-certificates/:pid", handleGetPartiCerti);
 router.get("/get-Merit-certificates/:pid", handleGeMeritCerti);

export default router;