import express from 'express';
import path from "path";
import config from "./config";

import indexRouter from './routes/index.route';

const app = config.app;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'assets')));

app.use("/images", express.static("images"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter);

config.runApp();