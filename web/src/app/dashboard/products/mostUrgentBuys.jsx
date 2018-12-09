import React from 'react';
import { List, Label } from 'semantic-ui-react';

const MostUrgentBuysList = () => (
  <List divided verticalAlign="middle">
    <List.Item>
      <List.Content floated="left">Chips</List.Content>
      <List.Content floated="right">
        <Label color="blue">17</Label>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Content floated="left">Chips</List.Content>
      <List.Content floated="right">
        <Label color="red">2</Label>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Content floated="left">Chips</List.Content>
      <List.Content floated="right">
        <Label color="green">500</Label>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Content floated="left">Chips</List.Content>
      <List.Content floated="right">
        <Label color="blue">17</Label>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Content floated="left">Chips</List.Content>
      <List.Content floated="right">
        <Label color="blue">17</Label>
      </List.Content>
    </List.Item>
  </List>
);

export default MostUrgentBuysList;
