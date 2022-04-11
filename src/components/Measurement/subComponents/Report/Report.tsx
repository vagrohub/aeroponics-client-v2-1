
import { useMeasurementContext } from '../../hooks';
import CardInfo from '../../../CardInfo';
import './report.scss';

const Report = () => {
    const { isMobile } = useMeasurementContext();

    return (
        <div className='report'>
            <CardInfo isMobile={isMobile}>
                <CardInfo.Title>Скачать отчет</CardInfo.Title>

                <CardInfo.Body>
                    <CardInfo.Group>
                        <CardInfo.Row><span>За день</span></CardInfo.Row>
                    </CardInfo.Group>
                    <CardInfo.Group>
                        <CardInfo.Row><span>За неделю</span></CardInfo.Row>
                    </CardInfo.Group>
                    <CardInfo.Group>
                        <CardInfo.Row><span>За все время</span></CardInfo.Row>
                    </CardInfo.Group>
                </CardInfo.Body>
            </CardInfo>
        </div>
    );
};

export default Report;
