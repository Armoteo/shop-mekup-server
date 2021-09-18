const { validationResult } = require('express-validator');
const userService = require('../service/user-service');
const ApiError = require('../exceptions/api-error');

class UserController {
    registration = async (req, res, next) => {
      let user;
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          user = next(ApiError.BadRequest('Error validation', errors.array()));
        }
        const { email, password } = req.body;
        const userData = await userService.registration(email, password);
        res.cookie('refreshToken', userData.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

        user = res.json(userData);
      } catch (e) {
        next(e);
      }

      return user;
    }

     login = async (req, res, next) => {
       let user;
       try {
         const { email, password } = req.body;
         console.log(email, password);
         const userData = await userService.login(email, password);
         res.cookie('refreshToken', userData.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

         user = res.json(userData);
       } catch (e) {
         next(e);
       }

       return user;
     }

     logout = async (req, res, next) => {
       let tokenData;
       try {
         const { refreshToken } = req.cookies;
         const token = await userService.logout(refreshToken);
         res.clearCookies('refreshToken');

         tokenData = res.json(token);
       } catch (e) {
         next(e);
       }

       return tokenData;
     }

     activate = async (req, res, next) => {
       let urlRedirect;
       try {
         const activationLink = req.params.link;
         await userService.activate(activationLink);

         urlRedirect = res.redirect(process.env.CLIENT_URL);
       } catch (e) {
         next(e);
       }

       return urlRedirect;
     }

     refresh= async (req, res, next) => {
       let user;
       try {
         const { refreshToken } = req.cookies;
         const userData = await userService.refresh(refreshToken);
         res.cookie('refreshToken', userData.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

         user = res.json(userData);
       } catch (e) {
         next(e);
       }

       return user;
     }

     getUsers = async (req, res, next) => {
       let arrayUsers;
       try {
         const users = await userService.getAllUsers();

         arrayUsers = res.json(users);
       } catch (e) {
         next(e);
       }

       return arrayUsers;
     }
}

module.exports = new UserController();
