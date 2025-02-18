"use client";
import { useEffect, useState } from "react";
import styles from "../styles/loader.module.scss";

export default function Loading() {
	const [loadingText, setLoadingText] = useState("Initializing");

	  useEffect(() => {
		const texts = ["Act Media Thailand", "Loading"];
		let currentIndex = 0;

		const interval = setInterval(() => {
			currentIndex = (currentIndex + 1) % texts.length;
			setLoadingText(texts[currentIndex]);
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.scanline} />

			<div className={styles.spinner}>
				<div className={styles.ring} />
				<div className={styles.ring} />
				<div className={styles.ring} />
				<div className={styles.hexagon} />
			</div>

			<div className={styles.progress} />
			<div className={styles.loadingText}>{loadingText}</div>
		</div>
	);
}
