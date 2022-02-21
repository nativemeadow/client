import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import httpFetch from '../../shared/http/http-fetch';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import configData from '../../config.json';

export default function ChangePassword() {
	return <div>Change Password</div>;
}
