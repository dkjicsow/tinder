let run = true, time_step = 500;
const wait = (n = 1) => new Promise((rs, rj) => run ? setTimeout(rs, n) : rj()),
	click = async (cn, i = 0) => {
		document.getElementsByClassName(cn)[i].click();
		return wait(time_step)
	};
document.onkeydown = (e = window.event) => {
	if (e.key === "a") run = run ? true : explore() || true;
	else if (e.key === "z") console.log(time_step *= 0.8);
	else if (e.key === "x") console.log(time_step *= 0.9);
	else run = false;
};
const explore = async () =>
	click("recCard__info").then(() =>
		Array.from(document.getElementsByClassName("bullet")).reduce((p, e) =>
			p.then(() => {
				e.click();
				return wait(time_step)
			}), Promise.resolve())
	).then(() =>
		click("recsGamepad__button--like")
	).then(() => explore());
explore() 
