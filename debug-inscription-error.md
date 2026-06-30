# Debug Session: inscription-error
**Status**: [CLOSED]
**Start Time**: 2026-06-29
**Description**: Debugging the "Une erreur s’est produite lors de l’inscription" error

## Summary of Fixes
1. **Fixed CORS**: Replaced manual headers with proper `cors` package configuration
2. **Updated JWT Expiration**: Changed to 1 day as requested
3. **Enhanced Logging**: Enabled Morgan in all environments, added detailed logs to `authController` and frontend
4. **Improved Error Handling**: Frontend now displays real backend error messages
5. **Updated Config Files**: Updated `render.yaml` and `.env` to match requirements

## Most Common Root Causes of "Erreur lors de l'inscription" (to check on Render):
1. **MongoDB Atlas IP Whitelist**: Go to Atlas → Network Access → Add `0.0.0.0/0` (allow all IPs temporarily for testing)
2. **Render Environment Variables**: Verify `MONGO_URI` and `JWT_SECRET` are set in Render dashboard
3. **Backend is Running**: Check Render backend is active (no deployment errors)

## Final Checklist for Deployment
1. Push all changes to your repo
2. Verify Render auto-deploys the new version
3. Check MongoDB Atlas IP whitelist
4. Test registration again!
