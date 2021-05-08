import React, { useState } from 'react';
import AutoComplete from 'react-autocomplete';
import { IoAddSharp, IoCloseOutline as RemoveIcon } from 'react-icons/io5';
import Axios from 'axios';
import '../CategoriesForm.css';

import { BACKEND } from '../../../../endpoints';

const CategoriesForm = ({ categories, register, setValue }) => {
	const [cat, setCat] = useState('');
	const [results, setResults] = useState([]);

	const handleAddCategory = async (value) => {
		console.log(value);
		try {
			const catName = categories.map((cat) => cat.name);
			if (!catName.includes(value)) {
				const response = await Axios.post(
					`${BACKEND}/projects/categories`,
					{ name: value },
					{ withCredentials: true },
				);
				categories.push(response.data.newCategory);
				setResults([...results, response.data.newCategory]);
				setValue('results', [
					...results.map((result) => result.id),
					response.data.newCategory.id,
				]);
				setCat('');
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<section className="categories-form p-2 pt-3 position-relative">
			<h2 className="ml-3 mb-2">Technologies</h2>

			<div className="input-container py-3 w-100">
				<label htmlFor="name" hidden>
					Technology name
				</label>
				<AutoComplete
					items={categories}
					shouldItemRender={(item, value) => {
						return item.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
					}}
					renderInput={(props) => (
						<>
							<input
								{...props}
								className={`flex-grow-1 p-1 px-2 w-100`}
								placeholder={'Category'}
							/>
							<div className="square mr-2"></div>
						</>
					)}
					getItemValue={(item) => item.name}
					menuStyle={{
						backgroundColor: 'var(--color-light)',
						borderRadius: '3px',
						zIndex: 10,
						padding: '2px 0',
						fontSize: '90%',
						position: 'fixed',
						overflow: 'auto',
						maxHeight: '50%',
					}}
					renderItem={(item, highlighted) => (
						<div
							key={item.id}
							style={{
								backgroundColor: highlighted
									? 'var(--complementary-color)'
									: 'var(--color-light)',
								display: 'block',
								cursor: 'pointer',
								opacity: 1,
							}}
							className="px-2 py-1"
						>
							{item.name}
						</div>
					)}
					value={cat}
					onChange={(e) => setCat(e.target.value)}
					onSelect={(_value, item) => {
						setCat('');

						if (!results.includes(item)) {
							setResults([...results, item]);
							setValue('results', [
								...results.map((result) => result.id),
								item.id,
							]);
						}
					}}
				/>
				<button
					className="button-project mt-2"
					type="button"
					onClick={() => handleAddCategory(cat)}
				>
					<IoAddSharp color="#5b666a" />
				</button>
			</div>
			<div
				{...register('results')}
				className={`results-container p-3 mb-2 w-100`}
			>
				{results.map((result, index) => (
					<div className="result button-project" key={index}>
						<p className="m-0 pr-1">{result.name}</p>
						<RemoveIcon
							style={{ cursor: 'pointer' }}
							onClick={(e) => {
								setResults(results.filter((item) => item.name !== result.name));
								setValue(
									'results',
									results
										.filter((item) => item.name !== result.name)
										.map((item) => item.id),
								);
							}}
						/>
					</div>
				))}
			</div>
		</section>
	);
};

export default CategoriesForm;
