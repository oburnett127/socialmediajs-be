module.exports = (sequelize, Sequelize) => {
  const Job = sequelize.define("job", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    desc: {
      type: Sequelize.STRING,
      allowNull: false
    },
    requirements: {
      type: Sequelize.STRING,
      allowNull: false
    },
    postDate: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });

  return Job;
};
