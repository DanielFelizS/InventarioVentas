import FormInput from "../atoms/Input";
import Select from "../atoms/Select";
import BtnAction from "../atoms/Button";
import { InputGroup, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import api from '../../../config'
import { useNavigate } from 'react-router'
import usePost from "../hooks/usePost";
import useGet from "../hooks/useGet";
import useDelete from "../hooks/useDelete";
import usePut from "../hooks/usePut";

export {
    FormInput, Select, BtnAction,
    InputGroup, Form, api,
    useState, useEffect, useNavigate,
    usePost, useGet, useDelete, usePut
}