const data = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const getAllUsers = (req, res) => {
    res.json(data.users);
}

const postUser = (req, res) => {
    const newUser = {
        id: data.users.length + 1,
        name: req.body.name
    }
    if (!newUser.name) {
        return res.status(400).json({ 'message': 'nome requerido' });
    }
    console.log(newUser);
    data.setUsers([...data.users, newUser])
    console.log(data.users);
    res.status(201).json(data.users);
}

const deleteUser = (req, res) => {
    const user = data.users.find((Element) => Element.id === req.body.id);
    if (!user) {
        return res.send('user not found');
    }
    const filterdArray = data.users.filter((Element) => Element.id !== req.body.id);
    data.setUsers(filterdArray)
    res.send(data.users);
}

const updateUser = (req, res) => {
    const user = data.users.find((Element) => Element.id === req.body.id);
    if (user) user.name = req.body.name
    const filterdArray = data.users.filter((Element) => Element.id !== req.body.id);
    const unsortedArray = [...filterdArray, user]
    data.setUsers(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.users);

}

const getUser = (req, res) => {
    const user = data.users.find((Element) => Element.id === parseInt(req.params.id));
    if (!user) {
        return res.send('User not found');
    }
    res.send(user);
}

module.exports = { getAllUsers, postUser, deleteUser, updateUser, getUser }