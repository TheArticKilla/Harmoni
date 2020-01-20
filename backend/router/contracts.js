/**
 * @typedef Contract
 * @property {string} contract.required - Contract link
 * @property {integer} userID.required - User for contract
 * @property {integer} eventID.required - Event for contract
 */

module.exports = (app, models, base, auth) => {
  const contractControl = require('../dao/contracts')(models)
  /**
  * @group Contract - Operations about contract
  * @route GET /contract/
  * @param {string} token.header.required - token
  * @returns {object} 200 - An array of contracts info
  * @returns {Error}  default - Unexpected error
  */

  app.get(base, ( req, res ) => {
    auth.check_permissions(req.headers.token, ["Admin", "Organizer"])
    .then(data => {
      if(data.auth){
        contractControl.contractGetAll().then((data)=>{
          res.send(data);
        })
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => console.log(err))
  });

  /**
  * @group Contract - Operations about contract
  * @route GET /contract/user/{user_id}/event/{event_id}/
  * @param {integer} user_id.path.required - Contract user id
  * @param {integer} event_id.path.required - Contract event id
  * @param {string} token.header.required - token
  * @returns {object} 200 - Return a Contract
  * @returns {Error}  default - Unexpected error
  */
  app.get(base+"/user/:user_id/event/:event_id", ( req, res ) => {
    auth.check_permissions(req.headers.token, ["Admin", "Organizer", "Artist"])
    .then(data => {
      if(data.auth){
        contractControl.contractGetOne(req.params.user_id, req.params.event_id).then((data)=>{
          res.send(data);
        })
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => console.log(err))
  });

  /**
  * @route POST /contract/
  * @group Contract - Operations about contract
  * @param {Contract.model} user.body.required - Contract information
  * @param {string} token.header.required - token
  * @returns {object} 200 - return Contract object
  * @returns {Error}  default - Unexpected error
  */
  app.post(base, (req, res) => {
    auth.check_permissions(req.headers.token, ["Admin", "Organizer"])
    .then(data => {
      if(data.auth){
        contractControl.contractCreateNoContract(
          req.body.userID,
          req.body.eventID)
          .then((data)=>{
            res.send(data)
          })
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => console.log(err))
  });

  /**
  * @group Contract - Operations about contract
  * @route DELETE /contract/user/{user_id}/event/{event_id}/
  * @param {integer} user_id.path.required - Contract user id
  * @param {integer} event_id.path.required - Contract event id
  * @param {string} token.header.required - token
  * @returns {object} 200 - Contract is deleted
  * @returns {Error}  default - Unexpected error
  */
  app.delete(base+"/user/:user_id/event/:event_id", (req, res) => {
    auth.check_permissions(req.headers.token, ["Admin", "Organizer"])
    .then(data => {
      if(data.auth){
        contractControl.contractDelete(req.params.user_id, req.params.event_id)
        .then((data)=>{
          res.send(data);
        })
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => console.log(err))
  });
}
