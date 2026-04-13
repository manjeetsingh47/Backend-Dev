const updateLastLogin = async (user) => {

    user.lastLogin = new Date();
    user.lastActive = new Date();

    await user.save();

};

const updateLastLogout = async (user) => {

    user.lastLogout = new Date();
    user.lastActive = new Date();

    await user.save();

};

export {
    updateLastLogin,
    updateLastLogout
};