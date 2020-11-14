import React from "react";
import propTypes from "prop-types";
import Modal from "../../modules/modal/modal";
import ModuleForm from "../../modules/form/moduleForm";

import { RowContainer } from "./newGameModal.style";

const NewGameModal = (props) => {
  const {
    isNewGame,
    handleCloseModal,
    curRoomName,
    curLimitTime,
    curMaxPlayersNum,
  } = props;

  const options = [
    { key: "15s", value: 15 },
    { key: "20s", value: 20 },
    { key: "25s", value: 25 },
    { key: "30s", value: 30 },
  ];

  const initialValues = {
    roomname: curRoomName,
    limitTime: curLimitTime,
    maxPlayers: curMaxPlayersNum,
  };

  return (
    <Modal
      width={28.5}
      height={37.6}
      hasXIcon
      handleCloseModal={handleCloseModal}
    >
      <RowContainer>
        {isNewGame ? (
          <ModuleForm type="gameStartForm" options={options} />
        ) : (
          <ModuleForm
            type="settingForm"
            options={options}
            initialValues={initialValues}
          />
        )}
      </RowContainer>
    </Modal>
  );
};

NewGameModal.propTypes = {
  isNewGame: propTypes.bool,
  handleCloseModal: propTypes.func,
  curRoomName: propTypes.string,
  curLimitTime: propTypes.number,
  curMaxPlayersNum: propTypes.number,
};

export default NewGameModal;

/*
<RowContainer width={22}>
<Header
					text={isNewGame ? 'New Game' : 'Setting'}
					variant='h3'
					color='navy'
					weight='normal'
					marginBottom='sm'
				/>
				<div className='form-content'>
					<label name='roomName'>Room Name</label>
					<PaddingSmInput
					name='roomName'
					colors='lightGrey'
					placeholder='Limit 20'
					defaultValue={curRoomName || null}
					/>
				</div>
				<div className='form-content'>
					<label name='limitTime'>Limit Time</label>
					<PaddingSmInput
					name='limitTime'
						colors='darkGrey'
						variant='select'
						defaultValue={`${curLimitTime || 20}s`}
						>
						<option>10s</option>
						<option>15s</option>
						<option>20s</option>
						<option>25s</option>
						<option>30s</option>
						</PaddingSmInput>
						</div>
						<div className='form-content'>
						<div className='row-container'>
						<label name='maxPlayers'>Max Players</label>
						<LineWidthControllerBox>
						<SmallRoundButton
						onClick={() => {
							if (maxPlayersNum <= 4) {
								setIsMinusDisable(true);
							} else {
								setIsMinusDisable(false);
								setMaxPlayersNum(maxPlayersNum - 1);
								onClickMinus(maxPlayersNum);
							}
						}}
						size='xsm'
						color='lightGrey'
						shadow={true}
						disable={isMinusDisable}
						>
						<Icon variant='BUTTON_MINUS' color='primary' />
						</SmallRoundButton>
						<Span text={`${maxPlayersNum}`} color='black' weight='exbold' />
						<SmallRoundButton
						onClick={() => {
							if (maxPlayersNum >= 8) {
								setIsPlusDisable(true);
							} else {
								setIsPlusDisable(false);
								setMaxPlayersNum(maxPlayersNum + 1);
								onClickPlus(maxPlayersNum);
							}
						}}
						size='xsm'
						color='secondary'
						shadow={true}
						disable={isPlusDisable}
						>
						<Icon variant='BUTTON_PLUS' color='white' />
						</SmallRoundButton>
						</LineWidthControllerBox>
						</div>
						</div>
						<div className='m-top'>
						<Button
						text='Enter'
						onClick={handleSubmit}
						color='secondary'
						size='sm'
						/>
						</div>
						</RowContainer>
						*/
// I'm here!!!!!! zcan you hear? no hear meyes

// const [maxPlayersNum, setMaxPlayersNum] = useState(4);
// const [isMinusDisable, setIsMinusDisable] = useState(false);
// const [isPlusDisable, setIsPlusDisable] = useState(false);

// useEffect(() => {
// 	return curMaxPlayersNum ? setMaxPlayersNum(curMaxPlayersNum) : null;
// 	// eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);
