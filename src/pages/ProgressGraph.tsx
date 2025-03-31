import React, { useState, useEffect } from 'react';
import LineChart from '../components/LineChart';
import { Container } from 'react-bootstrap';

const BathroomLightsChart: React.FC = () => {
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    // data should be fetched from the backend for individual patients
    const fetchData = async () => {
      const dummyData = [2, 3, 5, 4, 6, 7, 7];
      const dummyLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'];
      setData(dummyData);
      setLabels(dummyLabels);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <h2 style={{textAlign: "center"}}>Bathroom Lights Usage</h2>
      <LineChart data={data} labels={labels} />
    </Container>
  );
};

export default BathroomLightsChart;