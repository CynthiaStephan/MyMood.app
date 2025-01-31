const { where } = require('sequelize');
const MoodScoreModel = require('../models/moodScoreModel');
const UserModel = require('../models/userModel');
const { isSameDay } = require('date-fns');

class MoodScoreController {

    async getCurrentMoodByUserId(req, res) {
        const { id } = req.params;
        try {
            const currentMood = await MoodScoreModel.findOne({
                where: { user_id: id},
                order: [[ 'created_at', 'DESC']],
                attributes: ['score_id', 'score', 'user_id'],
            });
            if(!currentMood){
                return res.status(404).json({ error : 'No mood found'});
            }
            res.status(200).json(currentMood);
        } catch (error) {
            res.status(500).json({ error : error.message });
        }
    }

    async addMoodScoreToUser(req, res){
        const { id } = req.params;
        const { score } = req.body

        try {
            const lastUserMood = await MoodScoreModel.findOne({
                where: { user_id: id},
                order: [[ 'created_at', 'DESC']],
                attributes: ['score_id', 'score', 'user_id', 'created_at'],
            }); 
            const lastUserMoodDate = lastUserMood ? lastUserMood.dataValues.created_at : null;
            const currentDate = new Date()

            if(lastUserMood && isSameDay( lastUserMoodDate, currentDate )){
                const lastMoodId = lastUserMood.dataValues.score_id
                const addedMoodScore = await MoodScoreModel.update(
                    { score: score },
                    { where: { score_id: lastMoodId } }
                );

            return res.status(200).json(addedMoodScore);

            } else if (!lastUserMood || (lastUserMood && !isSameDay(lastUserMoodDate, currentDate))){
                const addedMoodScore = await MoodScoreModel.create({
                    user_id: id,
                    score: score
                }, 
            );
                return res.status(200).json(addedMoodScore);
            } else {

                res.status(400).json({ error : "Error when trying to add mood score"});
            }
        } catch (error) {
            res.status(500).json({ error : error.message });
        }

    }

}

module.exports = new MoodScoreController();