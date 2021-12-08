import React from 'react';
import Toolbar from '../components/ui/Toolbar';
import { LevelLogo } from '../components/ui/icons';

export const All = () => (
  <Toolbar brand={
    <>
      <LevelLogo />
      Level Protocol
    </>
  }>
    <li><a href="#">About</a></li>
    <li><a href="#">Join</a></li>
  </Toolbar>
)

export default {
  title: 'Toolbar',
}