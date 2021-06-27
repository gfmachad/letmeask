import {useContext} from 'react';
import {LangContext} from '../../context/LangContext';
import copyImg from '../../assets/images/copy.svg';

import './styles.scss';

type RoomCodeProps = {
	code: string;
};

export function RoomCode(props: RoomCodeProps) {
	const {
		dispatch: {translate},
	} = useContext(LangContext);

	function copyRoomCodeToClipboard() {
		navigator.clipboard.writeText(props.code);
	}

	return (
		<button className='room-code' onClick={copyRoomCodeToClipboard}>
			<div>
				<img src={copyImg} alt='Copy room code' />
			</div>
			<span>
				{translate('roomCode_btn')} #{props.code}
			</span>
		</button>
	);
}
