import AppContext from '../helpers/AppContext.jsx'

const appContext = new AppContext(['Lang', 'en'], 'Theme', 'User');
const { useLang, useTheme, useUser } = appContext.hooks;

export { appContext, useLang, useTheme, useUser }