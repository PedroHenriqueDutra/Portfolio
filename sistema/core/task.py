import time
class Task:
    def __init__(self, title, xp_reward):
        self.title = title
        self.xp_reward = xp_reward
        self.completed = False
        self.limit = 0

    def complete(self):
        self.completed = True
        return self.xp_reward

    def task_assumida(self):
        self.limit = -(time.localtime.tm_hour - 24)
        return 'Quest assumida, você tem {self.limit} para concluí-la'