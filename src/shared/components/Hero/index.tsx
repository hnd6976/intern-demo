import classnames from 'classnames/bind';

import styles from './styles.module.scss';

const cx = classnames.bind(styles);

export default function Hero() {
	return (
		<div>
			<div className={cx('red-text')}>Hero Component</div>
		</div>
	);
}
