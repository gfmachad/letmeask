import {useContext} from 'react';
import {useHistory, useParams} from 'react-router-dom';

import grayLightLogoImg from '../../assets/images/grayLight-logo.svg';
import deleteImg from '../../assets/images/delete.svg';
import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg';

import {Button} from '../../components/Button';
import {RoomCode} from '../../components/RoomCode';
import {Question} from '../../components/Question';

// import {useAuth} from '../hooks/useAuth';
import {LangContext} from '../../context/LangContext';
import {useRoom} from '../../hooks/useRoom';
import {database} from '../../services/firebase';

import './styles.scss';

type RoomParams = {
	id: string;
};
export function AdminRoom() {
	// const {user} = useAuth();
	const history = useHistory();
	const params = useParams<RoomParams>();
	const {
		dispatch: {translate},
	} = useContext(LangContext);

	const roomId = params.id;

	const {questions, title} = useRoom(roomId);

	async function handleEndRoom() {
		await database.ref(`rooms/${roomId}`).update({
			endedAt: new Date(),
		});

		history.push('/');
	}

	async function handleCheckQuestionAsAnswered(questionId: string) {
		await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
			isAnswered: true,
		});
	}

	async function handleHighlightQuestion(questionId: string) {
		await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
			isHighlighted: true,
		});
	}

	async function handleDeleteQuestion(questionId: string) {
		if (window.confirm('Are you sure you want to delete this question?')) {
			await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
		}
	}

	return (
		<div id='page-room'>
			<header>
				<div className='content'>
					<img src={grayLightLogoImg} alt='LetMeAsk' />
					<div>
						<RoomCode code={roomId} />
						<Button isOutlined onClick={handleEndRoom}>
							{translate('adm_btn')}
						</Button>
					</div>
				</div>
			</header>

			<main>
				<div className='room-title'>
					<h1>
						{translate('adm_room')} #{title}
					</h1>
					{questions.length > 0 && <span>{questions.length} questions</span>}
				</div>

				<div className='question-list'>
					{questions.map((question) => {
						return (
							<Question
								key={question.id}
								content={question.content}
								author={question.author}
								isAnswered={question.isAnswered}
								isHighlighted={question.isHighlighted}
							>
								{!question.isAnswered && (
									<>
										<button
											type='button'
											onClick={() => handleCheckQuestionAsAnswered(question.id)}
										>
											<img src={checkImg} alt='Check question' />
										</button>
										<button
											type='button'
											onClick={() => handleHighlightQuestion(question.id)}
										>
											<img src={answerImg} alt='Highlight question' />
										</button>
									</>
								)}
								<button
									type='button'
									onClick={() => handleDeleteQuestion(question.id)}
								>
									<img src={deleteImg} alt='Delete question' />
								</button>
							</Question>
						);
					})}
				</div>
			</main>
		</div>
	);
}
