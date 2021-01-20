import express from 'express';

export const home = (req, res) => res.render('home'); //res.render를 이용해서 pug파일을 보여줌.

export const search = (req, res) => res.send('Search');
