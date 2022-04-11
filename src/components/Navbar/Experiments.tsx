import { Experimet } from '../../interface/User';
import Details from '../Details';
import { useNavbarContext } from './hooks';

interface ExperimetsProps {
    experimentList: Experimet[];
    onSelectExperimentHandler(id: string): void
}
const Experimets = ({ experimentList, onSelectExperimentHandler }: ExperimetsProps) => {
    const { isMobile } = useNavbarContext();

    return (
        <Details isMobile={isMobile}>
            <Details.Summary>эксперименты</Details.Summary>

            <Details.Body>
                {
                    experimentList.map(experiment => {
                        return (
                            <Details.Item key={experiment._id}>
                                <span onClick={
                                    () => {
                                        onSelectExperimentHandler(experiment._id)
                                    }
                                }>
                                    {experiment.title}
                                </span>
                            </Details.Item>
                        );
                    })
                }
            </Details.Body>
        </Details>
    );
};

export default Experimets;