import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Wrapper from '../../../Wrapper';
import './temperatureGraph.scss';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
);

export const options = {
    responsive: true
};

interface TemperatureGraphProp {
    label: string;
    temperatures: {value: number, date: Date}[];
}
const TemperatureGraph = ({ temperatures, label }: TemperatureGraphProp) => {
    const data = {
        labels: temperatures.map(temperature => temperature.date.toLocaleDateString()),
        datasets: [
            {
                label: label,
                data: temperatures.map(temperature => temperature.value),
            }
        ]
    };

    return (
        <div className='temperature-graph'>
            <Wrapper isBoxSchadow>
                <Line
                    data={data}
                    options={options}
                />
            </Wrapper>
        </div>
    );
};

export default TemperatureGraph;
