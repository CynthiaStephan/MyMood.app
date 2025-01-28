const CohortModel = require('../models/cohortModel');
const CohortUserModel = require('../models/cohortUserModel');
const UserModel = require('../models/userModel');

class CohortController {
    
    async getCohorts(req, res){
        try {
            const cohorts = await CohortModel.findAll();
            if(!cohorts || cohorts.length === 0){
                return res.status(404).json({ error : 'Cohorts not found'});
            }
            res.status(200).json(cohorts);
        } catch (error) {
            res.status(400).json({ error : error.message });
        }
    }

    async getCohortById(req, res){
        const { id } = req.params;

        try {
            const cohort = await CohortModel.findByPk(id)
            if(!cohort || cohort.length === 0){
                return res.status(404).json({ error : 'Cohort not found'});
            }
             res.status(200).json(cohort)
            
        } catch (error) {
            res.status(400).json({ error : error.message });
        }
    }
    

    async createCohort(req, res){
        const { name } = req.body;

        try{
            const newCohort = await CohortModel.create(
                {
                    name: name,
                },
            );
            res.status(201).json(newCohort);
        } catch (error) {
            res.status(400).json({ error : error.message });
        }
    }

    async updateCohort(req, res){
        const { id } = req.params;
        const { name } = req.body;
        const updatedData = {
            name: name,
        };
        try{
            const updatedCohort = await CohortModel.update(updatedData, { where:{ cohort_id: id } });
            if(updatedCohort === 0){
                return res.status(404).json({ error });
            }
            res.status(200).json(updatedCohort);
        } catch (error) {
            res.status(400).json({ error : error.message });
        }
    }

    async deleteCohort(req, res){
        const { id } = req.params;

        try {
            const deletedCohort = await CohortModel.destroy({ where:{ cohort_id: id } });

            if(deletedCohort === 0){
                return res.status(404).json({ error : 'Cohort not found'});
            }
            res.status(200).json(deletedCohort)

        } catch (error) {
            res.status(400).json({ error : error.message });
        }
    }

    async assignUserToCohort(req, res) {
        const { user_id, cohort_id } = req.body;
      
        try {

          const user = await UserModel.findByPk(user_id);
          const cohort = await CohortModel.findByPk(cohort_id);
      
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
          if (!cohort) {
            return res.status(404).json({ error: 'Cohort not found' });
          }

          await CohortUserModel.create({
            id_user: user_id,
            id_cohort: cohort_id,
          });
      
          res.status(201).json({ message: `User ${user_id} assigned to Cohort ${cohort_id}` });
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      }

}

module.exports = new CohortController();