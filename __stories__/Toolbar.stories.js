import React from 'react';
import Toolbar from '../components/ui/Toolbar';
import { LevelLogoIcon } from '../components/ui/icons';

export const All = () => (
  <Toolbar brand={
    <>
      <LevelLogoIcon />
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