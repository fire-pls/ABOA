class OrderPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.admin
        scope.all
      else
        scope.where(user:user)
      end
    end
  end

  def home?
    true
  end

  def new?
    binding.pry
    !user.nil?
  end

  def create?
    record.user == user
  end

  def index?
    !user.nil?
  end

  def show?
    record.user == user || user.admin
  end

  def update?
    record.user == user || user.admin
  end

  def destroy?
    user.admin
  end
end
