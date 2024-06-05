import FormInput from "../atoms/Input/Input";
import Select from "../atoms/Select/Select";
import BtnAction from "../atoms/Button/Button";
import { InputGroup, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import api from '../../../config'
import { useNavigate, useParams } from 'react-router'
import usePost from "../hooks/usePost";
import useGet from "../hooks/useGet";
import useDelete from "../hooks/useDelete";
import usePut from "../hooks/usePut";
import { useReducer } from "react";
import { productosReducer } from "../../reducers/productosReducer";
import { ProductosData } from "../../reducers/productosReducer";
import { ProductosTypes } from "../../actions/Productos";
import {ventasReducer, VentasDatos } from "../../reducers/ventasReducer";
import { VentasTypes } from "../../actions/Ventas";

export {
    FormInput, Select, BtnAction,
    InputGroup, Form, api, useParams,
    useState, useEffect, useNavigate,
    usePost, useGet, useDelete, usePut,
    useReducer, ProductosData, ProductosTypes,
    productosReducer, VentasTypes, ventasReducer, VentasDatos
}