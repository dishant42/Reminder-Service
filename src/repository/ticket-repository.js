const { NotificationTicket } = require("../models/index");
const { Op } = require("sequelize");

class TicketRepository {

    async getAll() {
        try {
            const tickets = await NotificationTicket.finaAll();
        } catch (error) {
            throw error;
        }
    }

    async create(data) {
        try {
            console.log(data);
            const ticket = await NotificationTicket.create(data);
            return ticket;
        } catch (error) {
            throw error;
        }
    }

    async get(filter) {
        const ticket = await NotificationTicket.findAll({
            where: {
                Status: filter.Status,
                NotificationTime: {
                    [Op.lte]: new Date()
                }
            }
        })
        return ticket;
    }

    async update(ticketId, data) {
        try {
            const ticket = await NotificationTicket.findByPk(ticketId);
            if (data.Status)
                ticket.Status = data.Status;
            await ticket.save();
            return ticket
        } catch (error) {
            throw error
        }
    }
}

module.exports = TicketRepository