const router = require("express").Router();

const conversatiosServices = require("./conversations.services");
const passportJwt = require("../middlewares/auth.middleware");

router
  .route("/")
  .get(conversatiosServices.getAllConversations)
  .post(
    passportJwt.authenticate("jwt", { session: false }),
    conversatiosServices.newConversations
  );

router
  .route("/:conversationId")
  .get(
    passportJwt.authenticate("jwt", { session: false }),
    conversatiosServices.getConversatiosById
  )
  .patch(
    passportJwt.authenticate("jwt", { session: false }),
    conversatiosServices.patchMyConversations
  )
  .delete(
    passportJwt.authenticate("jwt", { session: false }),
    conversatiosServices.deleteConversation
  );

module.exports = router;
