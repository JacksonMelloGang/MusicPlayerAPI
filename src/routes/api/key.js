import { Router } from "express";
import database from "../../database";
import sql from "mysql";

const router = Router();

router.get('/', (req, res) => {
 
});

router.post('/', (req, res) => {
    res.status(200).json({"test": "test"})
});

router.put('/', (req, res) => {

});

router.delete('/', (req, res) => {
    
});



export default router;