import axios from 'axios';

const demo = true;

function getLogin (username, password) {
  return axios.post('http://login_api', { 'username': username, 'password': password });
}

function getRegister (username, password, first_name, given_name, phone_number, email, manager) {
  return axios.post('http://register_api', 
    { 'username': username, 'password': password, 'email': email, 'first_name': first_name, 'given_name': given_name, 'phone_number': phone_number, 'manager': manager });
}

function change_password (username, password) {
  return axios.post('http://change_password_api', { 'username': username, 'password': password });
}

function forget_password (username, email) {
  return axios.post('http://forget_password_api', { 'username': username, 'email': email });
}

function edit_profile (username, email) {
  return axios.post('http://edit_profile_api', { 'username': username, 'email': email });
}

export {
  getLogin,
  getRegister,
  change_password,
  forget_password,
  edit_profile
};