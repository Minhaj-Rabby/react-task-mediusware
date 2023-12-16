import React, { useState } from 'react';

const Problem1 = () => {

    const [show, setShow] = useState('all');
    const [tasks, setTasks] = useState([]);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const status = event.target.elements.status.value;
        const newTask = { name, status };
        setTasks((prevTasks) => [...prevTasks, newTask]);
        event.target.elements.name.value = '';
        event.target.elements.status.value = '';
    };

    const handleClick = (val) => {
        setShow(val);
    }

    const getSortedTasks = () => {
        // Sort tasks by the given order: Active, Completed, Others
        const sortedTasks = tasks.sort((a, b) => {
          const order = [ 'Completed','Active'];
          if (order.indexOf(a.status) === order.indexOf(b.status)) {
            // If both tasks have the same status, maintain their original order
            return 0;
          }
          return order.indexOf(a.status) > order.indexOf(b.status) ? -1 : 1;
        });
    
        // Filter tasks based on the selected tab
        return show === 'all' ? sortedTasks : sortedTasks.filter((task) => task.status.toLowerCase() === show);
      };

    const sortedTasks = getSortedTasks();

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form
                        className="row gy-2 gx-3 align-items-center mb-4"
                        onSubmit={handleFormSubmit}
                    >
                        <div className="col-auto">
                            <input type="text" required className="form-control" placeholder="Name" name="name" />
                        </div>
                        <div className="col-auto">
                            <input type="text" required className="form-control" placeholder="Status" name="status" />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${show === 'all' && 'active'}`}
                                type="button"
                                onClick={() => handleClick('all')}
                            >
                                All
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${show === 'active' && 'active'}`}
                                type="button"
                                onClick={() => handleClick('active')}
                            >
                                Active
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${show === 'completed' && 'active'}`}
                                type="button"
                                onClick={() => handleClick('completed')}
                            >
                                Completed
                            </button>
                        </li>
                    </ul>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sortedTasks.map((task, index) => (
                                    <tr key={index}>
                                        <td>{task.name}</td>
                                        <td>{task.status}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;