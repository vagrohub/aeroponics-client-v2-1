interface BodyProps {
    children: JSX.Element[] | JSX.Element
}
const Body = ({ children }: BodyProps) => {
    return (
        <div className='modal__body'>
            {children}
        </div>
    );
};

export default Body;